#!/usr/bin/env php
<?php

$user_api_url = 'https://github.com/api/v2/json/repos/show/%s';
$user = 'MattRead';

$repos_json_data = file_get_contents(sprintf($user_api_url, $user));
$repos_data = json_decode($repos_json_data);

$out = "    <ul class=\"posts\">\n";

foreach ($repos_data->repositories as $repo) {
    $datetime = date('c', strtotime($repo->pushed_at));
    $date = date('d M Y', strtotime($repo->pushed_at));
    $out .= <<<OUT
        <li>
            <time datetime="$datetime">
                $date
            </time>
            <a href="{$repo->url}">{$repo->name}</a>
        </li>

OUT;
}

$out .= "\n    </ul>";

file_put_contents('_includes/projects.html', $out);
