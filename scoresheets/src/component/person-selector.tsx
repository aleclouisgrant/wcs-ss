import { IPerson } from "@/classes/IPerson";
import React, { ChangeEvent, Component } from "react";

type SelectorProps<T extends IPerson> = {
    personDb: Array<T>,
    index: number,
    selectedPerson: T,
    setSelectedPerson: (person: T, index: number) => void
};

type SelectorState<T extends IPerson> = {
    value: T;
}

export default class Selector<T extends IPerson> extends Component<SelectorProps<T>, SelectorState<T>> {
    constructor(props: SelectorProps<T>) {
        super(props);
        this.state = { value: this.props.selectedPerson };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e : ChangeEvent<HTMLSelectElement>) {
        var valueIndex = parseInt(e.target.value);
        var newSelectedPerson = this.props.personDb[valueIndex];

        var newState : SelectorState<T> = { 
            value: newSelectedPerson 
        };

        this.setState(newState);
        this.props.setSelectedPerson(newSelectedPerson, this.props.index);
    }

    render() {
        if (this.props.selectedPerson != null){
            console.log(this.props.selectedPerson.FullName);
        }
        
        return (
        <select onChange={this.handleChange}>
            {this.props.personDb.map((person, index) => 
            <option key={index} value={index}>{person.FullName}</option>
            )}
        </select>
        )
    }
}