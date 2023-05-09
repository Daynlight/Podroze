

function ChangeBetwenLoginOrRegister(ModeLogin = false)
{
	var LoginForm = 
	`
	<form class="FormContainer">
	<input type="text" style="height: calc((100% - 20px - 40px)/3);" name="Login" id="Login" placeholder="Username" class="LoginRegisterInputForm">
	<input type="password" style="height: calc((100% - 20px - 40px)/3);" name="Password1" id="Password1" placeholder="Password" class="LoginRegisterInputForm">
	<input type="button" style="height: calc((100% - 20px - 40px)/3);" id="submit" value="Login" class="LoginRegisterInputForm">
  	</form>
	`;
	
	var LoginFormBTN =
	`<div id="Login" onclick="ChangeBetwenLoginOrRegister(true)" class="Login d-flex justify-content-center LoginOrRegisterActive">Login</div>
	<div id="Register" onclick="ChangeBetwenLoginOrRegister(false)" class="Register d-flex justify-content-center">Register</div>`;
	
	var RegisterForm = 
	`
	<form class="FormContainer">
	<input type="text" style="height: calc((100% - 20px - 40px)/6);" name="Login" id="Login" placeholder="Username" class="LoginRegisterInputForm">
	<input type="email" style="height: calc((100% - 20px - 40px)/6);" name="Email" id="Email" placeholder="Email" class="LoginRegisterInputForm">
	<input type="number" style="height: calc((100% - 20px - 40px)/6);" name="Phone" id="Phone" placeholder="Phone Nunber" class="LoginRegisterInputForm">
	<input type="password" style="height: calc((100% - 20px - 40px)/6);" name="Password1" id="Password1" placeholder="Password" class="LoginRegisterInputForm">
	<input type="password" style="height: calc((100% - 20px - 40px)/6);" name="Password2" id="Password2" placeholder="Repeat Password" class="LoginRegisterInputForm">
	<input type="button" style="height: calc((100% - 20px - 40px)/6);" id="submit" value="Register" class="LoginRegisterInputForm">
  	</form>
	`;
	
	var RegisterFormBTN = 
	`<div id="Login" onclick="ChangeBetwenLoginOrRegister(true)" class="Login d-flex justify-content-center">Login</div>
	<div id="Register" onclick="ChangeBetwenLoginOrRegister(false)" class="Register d-flex justify-content-center LoginOrRegisterActive">Register</div>`;

	if(ModeLogin) {
		document.getElementById("LoginForm").innerHTML = LoginForm;
		document.getElementById("LoginOrRegister").innerHTML = LoginFormBTN;
		
	} else {
		document.getElementById("LoginForm").innerHTML = RegisterForm;
		document.getElementById("LoginOrRegister").innerHTML = RegisterFormBTN;
	}
}
