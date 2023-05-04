
function LoginFormChange(ModeLogin = false)
{
	var LoginForm = 
	`
	<form>
	<input type="text" name="Login" id="Login" placeholder="Username" class="form">
	<input type="password" name="Password1" id="Password1" placeholder="Password" class="form">
	<input type="button" id="submit" value="Register" class="form">
  	</form>
	`;
	
	var LoginFormBTN =
	`<div id="Login" onclick="LoginFormChange(true)" class="Login col-2 d-flex justify-content-center ChoseActive">Login</div>
	<div id="Register" onclick="LoginFormChange(false)" class="Register col-2 d-flex justify-content-center">Register</div>`;
	
	var RegisterForm = 
	`
	<form>
	<input type="text" name="Login" id="Login" placeholder="Username" class="form">
	<input type="email" name="Email" id="Email" placeholder="Email" class="form">
	<input type="number" name="Phone" id="Phone" placeholder="Phone Nunber" class="form">
	<input type="password" name="Password1" id="Password1" placeholder="Password" class="form">
	<input type="password" name="Password2" id="Password2" placeholder="Repeat Password" class="form">
	<input type="button" id="submit" value="Register" class="form">
  	</form>
	`;
	
	var RegisterFormBTN = 
	`<div id="Login" onclick="LoginFormChange(true)" class="Login col-2 d-flex justify-content-center">Login</div>
	<div id="Register" onclick="LoginFormChange(false)" class="Register col-2 d-flex justify-content-center ChoseActive">Register</div>`;

	if(ModeLogin) {
		document.getElementById("LoginForm").innerHTML = LoginForm;
		document.getElementById("LoginChose").innerHTML = LoginFormBTN;
		
	} else {
		document.getElementById("LoginForm").innerHTML = RegisterForm;
		document.getElementById("LoginChose").innerHTML = RegisterFormBTN;
	}
}
