@extends('layouts.app')

@section('content')
<div class="container">
    <img src = "../icon.png" 
        width= "150"
        height= "150"
        margin= "20"
        borderRadius="100" />
    <h1>
        Welcome 
    </h1>
</div>


<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body")> {{ __('Recent Activity') }}</div>

                <div class="card-header">
                                    <div id="dashboard"></div>
                </div>
            </div>
        </div>
    </div>
    
</div>
@endsection
