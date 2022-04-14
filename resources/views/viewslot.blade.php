@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">{{ __('Search Booking Log') }}</div>

                <div class="card-body">
                    <div id="viewslot"></div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection