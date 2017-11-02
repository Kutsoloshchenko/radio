// Input line class, that represents single input line on sign-up or sign in form
export class InputLine{
    // error message string for this input line
    public error: string;

    // current value of input line
    public value: string;

    // sets default value for error and recives name of current line,
    // that is used as placeholder
    constructor( public name: string){
        this.error = "None";
    }
}