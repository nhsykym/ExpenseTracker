@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card mt-3">
                <div class="card-header">新規追加
                </div>
                <div class="card-body">
                    <div class="w-50">
                        <div class="form-group">
                          <label for="text1">日付:</label>
                          <input type="text" id="text1" class="form-control">
                        </div>
                        <div class="form-group">
                          <label for="passwd1">メモ:</label>
                          <input type="password" id="passwd1" class="form-control">
                        </div>
                        <div class="form-group">
                          <label for="textarea1">金額:</label>
                          <input id="textarea1" class="form-control"></input>
                        </div>
                        <div>
                          <button class="btn btn-primary">追加</button> 
                        </div>
                    </div>
                </div>
            <div>
        </div>
    </div>
</div>
@endsection
