@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('View Slots') }}</div>

                <div class="card-body">
                    <form method="POST" action="viewslot">
                        @csrf

                        <div class="row mb-3">
                            <label for="floor" class="col-md-4 col-form-label text-md-end">{{ __('Floor') }}</label>

                            <div class="col-md-6">
                                <select name="floor" id="floor">
                                    <option value="">--- Choose a floor ---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="table" class="col-md-4 col-form-label text-md-end">{{ __('Table') }}</label>

                            <div class="col-md-6">
                                <select name="table" id="table">
                                    <option value="">--- Choose a table ---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="seat" class="col-md-4 col-form-label text-md-end">{{ __('Seat') }}</label>

                            <div class="col-md-6">
                                <select name="seat" id="seat">
                                    <option value="">--- Choose a seat ---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>

           

                        <div class="row mb-3">
                            <label for="status" class="col-md-4 col-form-label text-md-end">{{ __('Status') }}</label>
                            
                                <div class="col-md-6">
                                    <select name="status" id="status">
                                        <option value="">--- Choose a status ---</option>
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                    </select>
                                </div>
                            
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Search') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
