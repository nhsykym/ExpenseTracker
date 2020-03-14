@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card mt-3">
                <div class="card-header">収支の一覧
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <th>日付</th><th>メモ</th><th>金額</th><th>編集</th><th>削除</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>タスクがでる</td>
                                <td>300円</td>
                                <td><button class="btn btn-primary">編集</button></td>
                                <td><button class="btn btn-danger">削除</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>タスクがでる</td>
                                <td>300円</td>
                                <td><button class="btn btn-primary">編集</button></td>
                                <td><button class="btn btn-danger">削除</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>タスクがでる</td>
                                <td>300円</td>
                                <td><button class="btn btn-primary">編集</button></td>
                                <td><button class="btn btn-danger">削除</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                      <ul class="pagination row justify-content-center">
                        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next<</a></li>
                      </ul>
                    </nav>
                </div>
            <div>
        </div>
    </div>
</div>
@endsection
