<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">  

<head>
	<title>Feedback</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->
</head>
    
<body>  
    <div id="main">
        <?php
            	
	    ini_set('display_errors', 1);
            $Subject = $_GET['subject'];
            $Message = $_GET['message'];
            
            if(strlen($Subject) > 0 && strlen($Message) > 0)
            {
                echo "200";
                
                if(strcmp($Subject, "Website") == 0)
                {
                    $message = $_REQUEST['message'] ;
                    $headers = "From:tyler@tyler.cloud";
                    $a = mail("tyler@tyler.cloud", "Website Feedback", $Message, $headers );
                    if ($a)
                    {
                         print("200");
                    } else {
                         print("500");
                    }   
                }
        
            }
            else
            {
                echo "400";
            }
            
            exit();
            
        {
            ?>
             <br><br>Parameters: Subject, Message
             
             <?php
        }
        ?>
     
    </div>
    
</body>
</html>