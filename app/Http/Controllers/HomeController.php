<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\UserNotification;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function sendMessage()  {
        $message = 'hello user';
        broadcast(new MessageSent($message));
    
        return response()->json(['status' => 'Message broadcasted to public channel!']);
    }

    public function sendPrivate(){
        $message = 'hello user';
        $user = User::find(1);
        $message  .= $user->name;

        broadcast(new UserNotification($message, $user->id));
    
        return response()->json(['status' => 'Notification sent to user!']);
    }
}
