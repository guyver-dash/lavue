<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Optimus\Optimus;
use Obfuscate;

class MainCategory extends Model
{
    

    protected $table = 'maincategories';
    protected $maincategory;

    protected $fillable = [
    	'user_id', 'name', 'description'
    ];

    public static $columns = [
        'id', 'user_id', 'name', 'desc', 'created_at', 'updated_at'
    ];

    public function merchantCategory(){


    	return $this->hasMany('App\MerchantCategory', 'maincategory_id', 'id');
    }

    public function products(){

    	return $this->belongsToMany('App\Product', 'maincategory_product', 'maincategory_id', 'product_id');
    }

    public function getNameAttribute( $value ){

        return str_slug($value);
    }
    
}
