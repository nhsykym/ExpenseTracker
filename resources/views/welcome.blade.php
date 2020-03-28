<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>家計簿アプリ</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        @if(app('env')=='local')
            <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        @endif
        @if(app('env')=='production')
            <link rel="stylesheet" href="{{ secure_asset('css/app.css') }}">
        @endif
    </head>
    <body>
        <div id="app"></div>
        @if(app('env')=='local')
            <script src="{{asset('js/app.js')}}"></script>
        @endif
        @if(app('env')=='production')
            <script src="{{secure_asset('js/app.js')}}"></script>
        @endif
    </body>
</html>
