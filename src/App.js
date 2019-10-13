import React from "react";
import logo from "./logo.svg";
import "./App.css";

function KeysAndValues(props) {
	return (
		<div className="label-and-input">
			<span> {props.label} </span>
			<input onChange={props.callBackFunction} className="input-box" />
		</div>
	);
}

function PasswordEnter(props) {
	return (
		<div className="label-and-input">
			<span> {props.label} </span>
			<input
				type="password"
				onChange={props.callBackFunction}
				className="input-box"
			/>
			{props.validate ? null : (
				<div className="password-validate">
					password should be greater than 7 characters
				</div>
			)}
		</div>
	);
}

function PasswordVerification(props) {
	return (
		<div className="label-and-input">
			<span> {props.label} </span>
			<input
				type="password"
				onChange={props.callBackFunction}
				className="input-box"
			/>
			{props.validate ? (
				<div className="password-validate">Password Matched</div>
			) : null}
		</div>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			phoneNo: null,
			emailId: "",
			password: "",
      reEnteredPassword: "",
      firstNameEntered: false,
      lastNameEntered : false,
			phoneValidate: false,
			emailValidate: false,
			passwordValidate: false,
			reEnteredPasswordValidate: false,
			validated: false
		};
		this.firstNameChange = this.firstNameChange.bind(this);
		this.lastNameChange = this.lastNameChange.bind(this);
		this.phoneNoChange = this.phoneNoChange.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.passwordEntered = this.passwordEntered.bind(this);
    this.passwordReEntered = this.passwordReEntered.bind(this);
    this.passwordCompare = this.passwordCompare.bind(this);
		this.validateAllFields = this.validateAllFields.bind(this);
	}

	validateAllFields = () => {
    return (
			this.state.firstNameEntered &&
			this.state.lastNameEntered &&
			this.state.phoneValidate &&
			this.state.emailValidate &&
			this.state.passwordValidate &&
			this.state.reEnteredPasswordValidate
		);
	};

	firstNameChange = e => {
		this.setState({
			firstName: e.target.value
    });
    if (e.target.value.length > 0) {
      this.setState({
        firstNameEntered : true
      })
    }
    else {
      this.setState({
				firstNameEntered: false
			});
    }
	};

	lastNameChange = e => {
		this.setState({
			lastName: e.target.value
    });
    if (e.target.value.length > 0) {
			this.setState({
				lastNameEntered: true
			});
		} else {
			this.setState({
				lastNameEntered: false
			});
		}
	};

	phoneNoChange = e => {
		this.setState({
			phoneNo: e.target.value
		});

		if (!isNaN(e.target.value) && e.target.value.length === 10) {
			this.setState({
				phoneValidate: true
      });
      
		} else {
			this.setState({
				phoneValidate: false
      });
      
		}
	};

	emailChange = e => {
		this.setState({
			emailId: e.target.value
		});
		if (
			e.target.value.includes("@") &&
			(e.target.value.endsWith(".com") || e.target.value.endsWith(".in"))
		) {
			this.setState({ emailValidate: true });
		} else {
			this.setState({ emailValidate: false });
		}
	};

	passwordEntered = e => {
		this.setState({
			password: e.target.value
		});
		if (e.target.value.length <= 7) {
			this.setState({
				passwordValidate: false
			});
		} else {
			this.setState({
				passwordValidate: true
			});
    }
    this.passwordCompare(e.target.value , this.state.reEnteredPassword);
	};

  passwordCompare(password, reEnteredPassword) {
    if (password === reEnteredPassword && password.length > 7 ) {
      this.setState({
        reEnteredPasswordValidate : true
      })
    }
    else {
      this.setState({
				reEnteredPasswordValidate: false
			});
    }
  }

	passwordReEntered = e => {
		this.setState({
			reEnteredPassword: e.target.value
    });
    this.passwordCompare(this.state.password, e.target.value);
	};

	render() {
    let allFieldsAppropriate = this.validateAllFields();
		return (
			<>
				<div className="notice">All the fields are compulsory</div>
				<div className="full-form">
					<KeysAndValues
						label="First Name :"
						callBackFunction={this.firstNameChange}
					/>
					<KeysAndValues
						label="Last Name :"
						callBackFunction={this.lastNameChange}
					/>
					<KeysAndValues
						label="Phone No :"
						callBackFunction={this.phoneNoChange}
					/>
					<KeysAndValues
						label="E-mail id :"
						callBackFunction={this.emailChange}
					/>
					<PasswordEnter
						label="Enter Password :"
						validate={this.state.passwordValidate}
						callBackFunction={this.passwordEntered}
					/>
					<PasswordVerification
						label="Retype password:"
						callBackFunction={this.passwordReEntered}
						validate={this.state.reEnteredPasswordValidate}
					/>
					<button className="submit-button" disabled={!allFieldsAppropriate}>
						Submit
					</button>
					{allFieldsAppropriate ? (
						<div>Click on the Submit button</div>
					) : (
						<div>
							All the values are not entered correctly. Please enter all values
							and click submit
						</div>
					)}
				</div>
			</>
		);
	}
}

export default App;
