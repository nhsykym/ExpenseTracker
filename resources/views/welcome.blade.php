<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <!--<style>-->
        <!--    html, body {-->
        <!--        background-color: #fff;-->
        <!--        color: #636b6f;-->
        <!--        font-family: 'Nunito', sans-serif;-->
        <!--        font-weight: 200;-->
        <!--        height: 100vh;-->
        <!--        margin: 0;-->
        <!--    }-->

        <!--    .full-height {-->
        <!--        height: 100vh;-->
        <!--    }-->

        <!--    .flex-center {-->
        <!--        align-items: center;-->
        <!--        display: flex;-->
        <!--        justify-content: center;-->
        <!--    }-->

        <!--    .position-ref {-->
        <!--        position: relative;-->
        <!--    }-->

        <!--    .top-right {-->
        <!--        position: absolute;-->
        <!--        right: 10px;-->
        <!--        top: 18px;-->
        <!--    }-->

        <!--    .content {-->
        <!--        text-align: center;-->
        <!--    }-->

        <!--    .title {-->
        <!--        font-size: 84px;-->
        <!--    }-->

        <!--    .links > a {-->
        <!--        color: #636b6f;-->
        <!--        padding: 0 25px;-->
        <!--        font-size: 13px;-->
        <!--        font-weight: 600;-->
        <!--        letter-spacing: .1rem;-->
        <!--        text-decoration: none;-->
        <!--        text-transform: uppercase;-->
        <!--    }-->

        <!--    .m-b-md {-->
        <!--        margin-bottom: 30px;-->
        <!--    }-->
        <!--</style>-->
    </head>
    <body>
        <body>
            <div id="app">
                <div class="container">
                    <h3 class="mt-5">家計簿管理システム</h3>
        
                    <!-- form -->
                    <div class="form-group mt-4">
                        <label for="todo">新規Todo</label>
                        <input type="text" class="form-control" id="todo">
                    </div>
                    <button type="submit" class="btn btn-primary">登録</button>
        
                    <!-- table -->
                    <table class="table mt-5">
                        <thead>
                            <th>日付</th><th>メモ</th><th>金額</th><th>編集</th><th>削除</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>タスクがでる</td>
                                <td><button class="btn btn-secondary">完了</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>タスクがでる</td>
                                <td><button class="btn btn-secondary">完了</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        
        <!-- avaScript -->
        +<script src="{{ asset('js/app.js')}}"></script>
        </body>
</html>
