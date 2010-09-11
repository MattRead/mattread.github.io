---
layout: post
title:  Javascript Prototype Behaviour in PHP
date:   Sep 9, 2010
---

One of the "neat" things in Javascript is you are able to dynamically add or change methods of a
class and automatically update every instance of that class. Some of the things I usually find
useful are adding to the String class, like so:

{% highlight javascript %}
String.prototype.htmlSpecialChars = function() {
    return this.replace(/\</g,'&#060;').replace(/\>/g,'&#062;');
}
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
}
{% endhighlight %}

Obviously we cannot do this in PHP, and why would we, right? However we can emulate this behaviour
to a certain extent using my "neat" little [Prototype](http://pastoid.com/9n+) class. With this
Prototype class we can dynamically add properties and methods to any class, and they will be
inherited by all instances of that class.

Let's look at the following "normal" PHP code.

{% highlight php5 %}
class Person extends Prototype
{
    public $name;
    public $gender;

    public function gender()
    {
        printf("%s is %s\n", $this->name, $this->gender);
    }
}

$matt = new Person;
$matt->name = 'Matt';
$matt->gender = 'male';
$matt->gender();

// Matt is male
{% endhighlight %}

Now, there is nothing magical or out-of-the-ordinary going on here. We just instantiate the Person
class and setup some properties. Calling the <code class="highlight php">gender()</code> method
outputs a nice little string for us.

However, you see that the Person class is actually a child of the Prototype class. This will allow
us to do some of that "neat" Javascript stuff. Using Prototype, let us expand the Person class to
add an `$age` property and an `age()` method to output a nice string. Like so:

{% highlight php5 %}
Person::add_property('age');
Person::add_method('age', 'printf("%s is a %d year old %s\n", $this->name, $this->age, $this->gender);');

$matt->age = 28;
$matt->age();

// Matt is a 28 year old male
{% endhighlight %}

Now all instances of Person inherit the `$age` property and `age()` method. So we can create a new
Person, Susie, and this object will now have the age stuff.

{% highlight php5 %}
$susie = new Person;
$susie->name = 'Susie';
$susie->gender = 'female';
$susie->age = 21;
$susie->age();

// Susie is a 21 year old female
{% endhighlight %}

One limitation of the Prototype class though, is you cannot overload a current method. So the
following code, that attempts to overload the <code class="highlight php">gender()</code> method,
will not work.

{% highlight php5 %}
Person::add_method('gender', 'printf("%s is a %d year old %s\n", $this->name, $this->age, $this->gender);');

$matt->gender();

// Matt is male
{% endhighlight %}

There are also many, many, many other problems with this Prototype class. Some of which are:

- The '$this' keyword is reserved, so it actually does a string replace and uses '$self' instead.
- You cannot access/add new methods or properties statically (until PHP 5.3 with \_\_callStatic()).
- It uses create\_function, so every "method" is actually defined in the global namespace.
- Iteration does not work, although it could possibly be done with Iterator, Countable, et al.
- You cannot reference static variables/methods in your add method.
- You cannot share methods between classes.
- And so on and so forth...

This class was just an experiment to see if it was at all possible to implement something like
Javascript's prototype behaviour in PHP with out using the
[Runkit PECL extension](http://pecl.php.net/package/runkit). I had no intention of actually making
this usable in production, for many reasons ;), although it was fun. If you have any improvements or
additions to Protoype please add them to the [wiki page](http://mattread.org/PHPPrototype), or paste
them in comment.
