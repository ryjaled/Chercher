<?php
	//check command
	if(!isset($_REQUEST['cmd'])){
		echo "cmd is not provided";
		exit();
	}
	/*get command*/
	//A method is called based on the command
	$cmd=$_REQUEST['cmd'];
	switch($cmd){
		case 1:
			addNewPool();
			break;
    case 2:
      getBooks();
      break;
		case 3:
			getRequest();
			break;
		case 4:
		  checkFull();
		  break;
		case 5:
			addNewUser();
			break;
		case 6:
			login();
			break;
		case 7:
			generateReport();
			break;
		case 8:
			getNews();
			break;
		case 9:
			requestCard();
			break;
		case 10:
			addBook();
			break;
		case 11:
			sendContactForm();
			break;
		case 12:
			adminLogin();
			break;
		default:
			echo "wrong cmd";	//change to json message
			break;
	}

//Edits user's first name
function addNewPool(){
		include("users.php");
		$user=new users();
		if($_REQUEST['poolname']==""){
			echo'{"result":0,"message":"User info not given"}';
			exit();
		}

		$poolname=$_REQUEST['poolname'];
		$poolcapacity=$_REQUEST['poolcapacity'];
		$pooldeparture=$_REQUEST['pooldeparture'];
		$poolcreateid=$_REQUEST['poolcreateid'];
		$pooldestination=$_REQUEST['pooldestination'];


		$verify=$user->addNewPool($poolname,$poolcapacity,$poolcreateid,$pooldestination,$pooldeparture);
		if($verify==false){
			echo'{"result":0,"message":"Pool not added"}';
		}
		else{
			echo'{"result":1,"message":"Pool added"}';
		}
	}

//Edits user's firstname
	function getBooks(){
    include_once("users.php");

		$user = new users();

		$verify = $user->getBooks();


		$array = array();
		while($one = $user->fetch())
		{
			$array[] = $one;
		}

		echo json_encode($array);
  }

//Edits user's lastname
	function getRequest(){
    include_once("users.php");

		$user = new users();

		$verify = $user->getRequests();


		$array = array();
		while($one = $user->fetch())
		{
			$array[] = $one;
		}

		echo json_encode($array);
	}

//Deletes User
	  function checkFull(){

	    include("users.php");
	    $user=new users();


			// echo json_encode($myarray);
	  }

//Adds new User
function addNewUser(){
		include("users.php");
		$user=new users();
		if($_REQUEST['username']==""){
			echo'{"result":0,"message":"User info not given"}';
			exit();
		}

		$firstname=$_REQUEST['firstname'];
		$lastname=$_REQUEST['lastname'];
		$username=$_REQUEST['username'];
		$password=$_REQUEST['password'];
		$email=$_REQUEST['email'];
		$organization=$_REQUEST['organization'];
		$bank=$_REQUEST['bank'];
		$creditcard=$_REQUEST['creditcard'];
		$telephone=$_REQUEST['telephone'];
		confirmSignUp($firstname,$telephone);

		$verify=$user->addNewUser($firstname,$lastname,$username,$password,$email,$organization,$bank,$creditcard,$telephone);
		if($verify==false){
			echo'{"result":0,"message":"User not added"}';
		}
		else{
			$id=$user->getID($username);
			$id=$user->fetch();

			$array=array('result'=>1,'message'=>'User added',
			'firstname'=>$firstname,'lastname'=>$lastname,'username'=>$username
		,'password'=>$password,'email'=>$email,'organization'=>$organization,'bank'=>$bank,'creditcard'=>$creditcard,'telephone'=>$telephone,'userID'=>$id["ID"]);

		echo json_encode($array);

		}
	}

	function confirmSignUp($firstname, $telephone)
	{
		$sender = "Chercher";
		$message = "Hey there and welcome to Chercher, $firstname! Congratulations on your signup!";
		$smsmessage = str_replace(' ','%20',$message);
		$ch = curl_init("http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=$telephone&from=$sender&smsc=smsc&text=$smsmessage");
		//session_write_close();
		curl_exec($ch);
	}

//Logs user into system
		function login(){
			include("users.php");
			$username=$_REQUEST['username'];
			$password=$_REQUEST['password'];
			$user = new users();
			$user2 = new users();

			$verify = $user->login($username,$password);

			if($verify==false){
				// $ans= $user->getEmail($username);
				// $ans=$user->fetch();
				// if($ans!=false){
				// 	$array = array('result'=>0,'message'=>'Please enter the right password','email'=>$ans["email"]);
				// 	echo json_encode($array);
				// }
				// else{
					echo '{"result":0,"message":"Wrong User information"}';

				// }

			}
			else{
				session_start();
				$_SESSION=$verify;

				$id=$user->getID($username);
				$bank=$user2->getBank($username);

				$id=$user->fetch();
				$bank=$user2->fetch();


				$array=array('result'=>1,'message'=>'User logged in',
			'username'=>$username,'password'=>$password,'userID'=>$id["ID"],'bank'=>$bank["BANK"]);
				echo json_encode($array);
			//	echo'{"result":1,"message":"Welcome to the Rally"}';
			}

		}

		function generateReport()
		{
			include("users.php");
			$user=new users();
			$user_id=$_REQUEST['id'];

			$verify = $user->pullReport($user_id);

			$array = array();
			while($one = $user->fetch())
			{
				$array[] = $one;
			}

			echo json_encode($array);
		}

		function getNews()
		{
			include("users.php");
			$user=new users();


			$verify = $user->pullNews();

			$array = array();
			while($one = $user->fetch())
			{
				$array[] = $one;
			}

			echo json_encode($array);
		}

		function requestCard()
		{

			$username=$_REQUEST['username'];
			$bank=$_REQUEST['bank'];

			include("users.php");
			$user=new users();

			echo $username;
			echo $bank;

			$verify=$user->addRequest($username,$bank);
			if($verify==false){
				echo'{"result":0,"message":"Request not added"}';
			}
			else{
				echo'{"result":1,"message":"Request added"}';
			}
		}


		function addBook()
		{

			$hotelname=$_REQUEST['hotelname'];
			$occupants=$_REQUEST['occupants'];
			$checkindate=$_REQUEST['checkindate'];
			$checkoutdate=$_REQUEST['checkoutdate'];



			include("users.php");
			$user=new users();

			echo $telephone;
			$verify=$user->addBook($hotelname,$occupants,$checkindate,$checkoutdate);
			if($verify==false){
				echo'{"result":0,"message":"Request not added"}';
			}
			else{
				echo'{"result":1,"message":"Request added"}';
			}
		}

		function sendContactForm()
		{

			// $name=$_REQUEST['name'];
			$messagearea=$_REQUEST['messagearea'];
			$username=$_REQUEST['username'];


			include("users.php");
			$user=new users();

			$verify=$user->sendContact($messagearea,$username);
			if($verify==false){
				echo'{"result":0,"message":"Request not added"}';
			}
			else{
				echo'{"result":1,"message":"Request added"}';
			}
		}



		function adminLogin(){
			include("users.php");
			$username=$_REQUEST['username'];
			$password=$_REQUEST['password'];
			$user = new users();
			$user2 = new users();

			$verify = $user->adminLogin($username,$password);

			if($verify==false){
				// $ans= $user->getEmail($username);
				// $ans=$user->fetch();
				// if($ans!=false){
				// 	$array = array('result'=>0,'message'=>'Please enter the right password','email'=>$ans["email"]);
				// 	echo json_encode($array);
				// }
				// else{
					echo '{"result":0,"message":"Wrong User information"}';

				// }

			}
			else{
				session_start();
				$_SESSION=$verify;
				//
				// $id=$user->getID($username);
				// $bank=$user2->getBank($username);
				//
				// $id=$user->fetch();
				// $bank=$user2->fetch();


				$array=array('result'=>1,'message'=>'User logged in',
			'username'=>$username,'password'=>$password);
				echo json_encode($array);
			//	echo'{"result":1,"message":"Welcome to the Rally"}';
			}

		}



?>
