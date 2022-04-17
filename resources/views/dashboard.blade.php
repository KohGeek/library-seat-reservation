@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">

        <div class="col-md-12">
            <div>
                <img src="/images/icon.png" class="mx-2 my-2" style="max-height:150px" />
                <h1 class="mt-2">Welcome, {{Auth::user()->name}}</h1>
            </div>
            <div class="card mt-4">
                <div class="card-header" )> {{ __('Bookings') }}</div>
                <div class="card-body">
                    <div id="dashboard"></div>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection