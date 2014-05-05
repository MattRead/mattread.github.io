---
layout:     post
title:      hConsole: A Live Habari Console
date:       May 5, 2014
category:   notes
tag:        habari, code
---

If you have ever written code before, you've come across a situation where you needed to debug or test something simple in your code. Doing this with a Command Line Interpreter is quite simple. Type your code, see what comes out. But when it comes to web applications, it's a little harder. There are HTTP requests, Sessions, Cookies, and a Webserver involved. This is where [hConsole](https://github.com/habari-extras/hconsole "hConsole github repo") comes in.

hConsole is a live [Habari](https://habariproject.org/en/ "Habari Project's main site") console, or command line, that allows you to evaluate your code directly in your Habari installation, with all the HTTP request, Sessions, etc. there. You can access the entire Habari core, even trigger plugin actions and filters, and view the live result on screen.

Once installed, you simply click on the hConsole button in the bottom right of your screen to bring up the console. In the console you can evaluate any PHP code and utilize the entire Habari base. You can also execute SQL, to query your Habari's database directly (Tip: press <kbd>ctrl</kbd>+<kbd>Q</kbd> to run code without the mouse).

<div><figure>
<a href="http://farm9.staticflickr.com/8099/8590516105_9d9462457c_b.jpg" class="fancybox"><img alt="hconsole_php" src="http://farm9.static.flickr.com/8099/8590516105_9d9462457c.jpg" class="card center"></a>
<figcaption><b>Figure 1</b> Using the debug area to output code.<figcaption>
</figure></div>

###Debugging PHP and Habari

hConsole has 2 parts; A debug section, for outputting variables and such (`Utils::debug()` comes in handy here), and the ability to trigger plugin hooks and affect the output of, say, post titles. There is also an option to `htmlspecialchars()` the output of the debugging code if you wanted to output HTML tags, for example. Let's look at two basic examples:

<div><figure>
<pre class="highlight php">
$test = "this is a test";
echo $test;
</pre>
<figcaption><b>Example 1</b> A simple Debug echo<figcaption>
</figure></div>

The code in example 1 will simply echo the variable `$test` above the command line in hConsole; The so called "Debug Area". We can also implement plugin hooks.

<div><figure>
<pre class="highlight php">
filter_post_title_out {
    function boo ($title)
    {
        return $title . ' Boo!';
    }
}
</pre>
<figcaption><b>Example 2</b> Filtering Post Titles<figcaption>
</figure></div>

The code in example 2 will register the function `boo()` to the `post_title_out` filter. Function `boo()` then appends `" Boo!"` to all post titles for the page you are looking at. We can also combine the two and have debug output along will running filters or actions.

Of course these are very simple examples of what can be done with hConsole. In the real world it becomes a very powerful tool. 

####Debugging With hConsole

Let's look at an example of a real debugging situation where hConsole came in handy. When trying to debug Habari's internal Cron system it's hard to tell why it's failing when PHP is set to use CURL. Recently [Scott](http://skippy.net "Scott's website") was having an issue with a local install, where crons weren't running.

The issue comes from the fact that Habari makes an asynchronous HTTP call to itself to trigger all the Cronjobs to run. So you never actually see any errors from this, and when CURL throws an exception, nothing is in the logs. So to test why Scott's crons where not running he used hConsole.

<div><figure>
<pre class="highlight php">
$cronurl = URL::get( 'cron',array( 'asyncronous' => Utils::crypt( Options::get( 'public-GUID' ) ) ) );
$request = new RemoteRequest( $cronurl, 'GET', 100 );
$request->execute();
</pre>
<figcaption><b>Example 3</b> Making a request to the cron.<figcaption>
</figure></div>

In example 3 we run the cron trigger using hConsole with a longer timeout so we can see what is happening. And Scott was able to get the error `Exception: CURL Error 60: SSL certificate problem, verify that the CA ...`. He was then able to add his  SSL certificate chain to his Apache config so CURL accepted the certificate, and crons ran smoothly.

###Debugging SQL

hConsole will also let you directly run SQL statements on your database. It will even substitute proper table names when using "curly brackets", like `{posts}` becomes `habari__posts`, or whatever you chose during install. You can run any database query by simply checking the SQL checkbox, and the results will output in a nicely formatted table.

<div><figure>
<pre class="highlight sql">
select * from {posts} limit 3;
</pre>
<figcaption><b>Example 4</b> SQL selecting the 3 most recent posts.<figcaption>
</figure></div>

And the results from running example 4 show in a nice tabular format so we can easily see what's in our database.

<div><figure>
<a href="http://farm9.static.flickr.com/8506/8591609336_bf476f433f_b.jpg" class="fancybox"><img alt="hconsole_sql" src="http://farm9.static.flickr.com/8506/8591609336_bf476f433f.jpg" class="center card"></a>
<figcaption><b>Figure 2</b> Results of selecting the 3 most recent posts.<figcaption>
</figure></div>

You can also, of course, run other statements, such as delete, update, show tables, etc. All statements will output their results, or show an error if there are troubles.

##Developer's Best Friend

As you can see hConsole is the plugin and theme developers best friend. Whether you are debugging a core Habari issue, or simply looking at the contents of an object. You can pretty much debug and test any code you need to; PHP, SQL, and Habari.

<ul class="download">
<li><a href="https://github.com/habari-extras/hconsole/archive/master.zip">hConsole Master <i class="icon-box-add"></i></a></li>
<li><a href="https://github.com/habari-extras/hconsole">GitHub Repo <i class="icon-github"></i></a> </li>
</ul>

*[PHP]: PHP: Hypertext Preprocessor
*[HTML]: Hyper Text Markup Language
*[SQL]: Structured Query Language
*[SSL]: Secure Socket layer
*[HTTP]: HyperText Transfer Protocol
*[CURL]: Client URLs
