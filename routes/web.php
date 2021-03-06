
<?php
use Illuminate\Http\Request;

Auth::routes();

Route::post('/', 'Auth\LoginController@login');
Route::get('/', 'Auth\LoginController@showLoginForm')->name('login');
Route::get('logout', 'Auth\LoginController@logout');
Route::get('password/request', 'Auth\ForgotPasswordController@showForgotForm');
Route::post('password/resetpassword', 'Auth\ForgotPasswordController@reset_password');

Route::group(['namespace'=>'V1','middleware'=>['web','auth']], function () {
    Route::get('/dashboard', 'DashboardController@index')->name('Dashboard');
    Route::get('/home', 'DashboardController@index');
    Route::get('/campaign', 'CampaignController@index')->name('Campaign');
    Route::get('/campaignP', ['uses' => 'CampaignController@check_phone_number']);
    Route::get('/campaignGoal', ['uses' => 'CampaignController@goal_action']);
    Route::get('/newCampaign', ['uses' => 'CampaignController@new_compaign']);
    Route::get('/viewCampaign', ['uses' => 'CampaignController@view_compaign']);
    Route::get('/Mycampaign', ['uses' => 'mycampaignController@Mycampaign']);
});
	//Manage users routes
   	Route::get('/usersList', ['uses' => 'UserController@usersList'])->name('UsersList');
    Route::post('/search_user', ['uses' => 'UserController@search_user']);
    Route::post('/saveUser', ['uses' => 'UserController@save_user']);
    Route::post('/deleteUser', ['uses' => 'UserController@delete_user']);
    Route::post('/editUser', ['uses' => 'UserController@edit_user']);
    Route::post('/updateUser', ['uses' => 'UserController@update_user']);

//navigation links routes
 	Route::get('/navigationList', ['uses' => 'NavigationController@navigation_list'])->name('NavigationList');
    Route::post('/searchNavigation', ['uses' => 'NavigationController@search_navigation']);
    Route::post('/saveNavigation', ['uses' => 'NavigationController@save_navigation']);
    Route::post('/deleteNavigation', ['uses' => 'NavigationController@delete_navigation']);
    Route::post('/editNavigation', ['uses' => 'NavigationController@edit_navigation']);
    Route::post('/updateNavigation', ['uses' => 'NavigationController@update_navigation']);

    //Accounts module routes
    Route::get('/accountsList', ['uses' => 'AccountController@accounts_list'])->name('Accounts');
    Route::post('/searchAccount', ['uses' => 'AccountController@search_account']);
    Route::post('/saveAccountGeneral', ['uses' => 'AccountController@save_account_general']);
    Route::post('/deleteAccountGeneral', ['uses' => 'AccountController@delete_account_general']);
    Route::post('/editAccountGeneral', ['uses' => 'AccountController@edit_account_general']);
    Route::post('/updateAccountGeneral', ['uses' => 'AccountController@update_account_general']);
    Route::post('/saveAccountbilling',['uses'=>'AccountController@save_billing_information']);


    //Sales module routes
    Route::get('/salesList', ['uses' => 'SalesController@sales_list'])->name('Sales');
    Route::get('/trafficEstimator', ['uses' => 'SalesController@traffic_estimator']);
    Route::get('/documentsList', ['uses' => 'SalesController@documentslist']);
    
    //left nav 
    Route::get('/Agency', ['uses' => 'leftNavController@agency']);
    Route::get('/userAccountsMgmt', ['uses' => 'AccountController@userAccountsMgmt']);
    Route::get('/Translation', ['uses' => 'AccountController@Translation']);
    Route::get('/agencyd', ['uses' => 'agencydController@agencyd']);
    //left nav 
    Route::get('/reportsList', ['uses' => 'ReportsController@reportList']);
    Route::get('/reportFTP', ['uses' => 'ReportsController@reportFTP']);
    Route::get('/searchreport', ['uses' => 'ReportsController@searchreport']);
    Route::get('/largecsv', ['uses' => 'ReportsController@largecsv']);
    Route::get('/uploadcsv', ['uses' => 'ReportsController@uploadcsv']);
    Route::get('/report1', ['uses' => 'ReportsController@report1']);

     //chatlist 
    Route::get('/chatlist', ['uses' => 'ChatController@chatlist']);
    Route::get('/message', ['uses' => 'ChatController@message']);
    Route::get('/preGeneratedMessages', ['uses' => 'ChatController@pregenmsg']);
    Route::get('/webchat', ['uses' => 'ChatController@webchat']);

    //message center
    Route::get('/msglist', ['uses' => 'msgController@msglist']);


    //japanese
    Route::get('/japanese', 'japaneseController@japanese');
   
   //accounting
    Route::get('/accounting', 'accountingController@accounting');

    //
     Route::get('/abc', 'centerController@center');

//
 Route::get('/MyCampaign', ['uses' => 'mycampaignController@mycampaign']);
 Route::get('/goalaction', ['uses' => 'mycampaignController@goalaction']);

 //
  Route::get('/accounts', ['uses' => 'accountsController@accounts']);
  //
  Route::get('/Campaigntools', ['uses' => 'CampaigntoolsController@Campaigntools']);
  //
  Route::get('/Accountsa', ['uses' => 'AccountsaController@Accountsa']);