<?php

namespace App\Policies;

use App\Models\BookingData;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BookingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->role == 'librarian'
            ? Response::allow()
            : Response::deny('You are not authorized to view any data.');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BookingData  $bookingData
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, BookingData $bookingData)
    {
        return $user->id === $bookingData->booked_by
            ? Response::allow()
            : Response::deny('You are not authorized to view this resource.');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BookingData  $bookingData
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, BookingData $bookingData)
    {
        return $user->id === $bookingData->booked_by
            ? Response::allow()
            : Response::deny('You are not authorized to update this resource.');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BookingData  $bookingData
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, BookingData $bookingData)
    {
        return $user->id === $bookingData->booked_by
            ? Response::allow()
            : Response::deny('You are not authorized to delete this resource.');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BookingData  $bookingData
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, BookingData $bookingData)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\BookingData  $bookingData
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, BookingData $bookingData)
    {
        //
    }
}
