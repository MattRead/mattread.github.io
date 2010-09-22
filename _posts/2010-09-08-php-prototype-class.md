---
layout:     post
title:      PHP Prototype Class
date:       Sep 8, 2010
categories: snippets
gist:       576295
---

{% highlight php %}
<?php

class Prototype
{
    protected static $prototype_methods = array();
    protected static $prototype_properties = array();

    protected $prototype_obj_properties = array();

    public static function add_method()
    {
        $args = func_get_args();
        $method = array_shift( $args );
        $callback = str_replace( '$this', '$self', array_pop( $args ) );
        array_push( $args, '$self' );
        $args = implode( ',', $args);

        self::$prototype_methods[$method] = create_function( $args, $callback );
    }

    public static function add_property( $name )
    {
        self::$prototype_properties[] = $name;
    }

    public function __construct()
    {
        if ( self::$prototype_properties ) {
            $this->prototype_obj_properties = array_combine(
                self::$prototype_properties,
                array_fill( 0, count(self::$prototype_properties), null )
                );
        }
    }

    public function __call( $method, $args = array() )
    {
        if ( isset( self::$prototype_methods[$method] ) ) {
            array_push( $args, $this );
            return call_user_func_array( self::$prototype_methods[$method], $args );
        }
    }

    public function __get( $name )
    {
        if ( in_array( $name, self::$prototype_properties ) ) {
            return isset( $this->prototype_obj_properties[$name] ) ?
                   $this->prototype_obj_properties[$name] : null;
        }
        else {
            return null;
        }
    }

    public function __set( $name, $value )
    {
        if ( in_array( $name, self::$prototype_properties ) ) {
            return $this->prototype_obj_properties[$name] = $value;
        }
        else {
            return null;
        }
    }

    public function __isset( $name )
    {
        return isset( $this->prototype_obj_properties[$name] );
    }

    public function __unset( $name )
    {
        unset( $this->prototype_obj_properties[$name] );
    }
}


?>
{% endhighlight %}
