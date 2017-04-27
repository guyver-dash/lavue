<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    
    protected $table = "merchants";

    protected $fillable = [

    	'created_by', 'name', 'website', 'email'
    	
    ];
}
