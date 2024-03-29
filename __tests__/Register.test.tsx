import RegistrationForm from "@/app/register/page";
import { render, screen } from "@testing-library/react";
import {  userEvent } from "@testing-library/user-event";

describe('Register form', () => {
    it('should have title', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const title = screen.getByText('Register for new user!');
        //Assert
        expect(title).toBeInTheDocument();
    });
    it('should have subtitle', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const subtitle = screen.getByText('Please fill all fields');
        //Assert
        expect(subtitle).toBeInTheDocument();
    });
    it('should have username input', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const usernameInput = screen.getByPlaceholderText('Username');
        //Assert
        expect(usernameInput).toBeInTheDocument();
    });
    it('should have email input', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const emailInput = screen.getByPlaceholderText('Email');
        //Assert
        expect(emailInput).toBeInTheDocument();
    });
    it('should have password input', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const passwordInput = screen.getByPlaceholderText('Password (at least 6 characters)');
        //Assert
        expect(passwordInput).toBeInTheDocument();
    });
    it('should have telephone input', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const telephoneInput = screen.getByPlaceholderText('Telephone');
        //Assert
        expect(telephoneInput).toBeInTheDocument();
    });
    it('should have role input', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const roleInput = screen.getByPlaceholderText('Role (user or admin)');
        //Assert
        expect(roleInput).toBeInTheDocument();
    });
    it('should have register button', () => {
        //Arrange
        render(<RegistrationForm />);
        //Act
        const registerButton = screen.getByText('Register');
        //Assert
        expect(registerButton).toBeInTheDocument();
    });

})
    


