<?php

namespace App\Listeners;

use App\Events\UserApproved;
use App\Notifications\ApprovedUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserApprovedNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserApproved $event): void
    {
        $event->user->notify(new ApprovedUser($event->user));
    }
}
