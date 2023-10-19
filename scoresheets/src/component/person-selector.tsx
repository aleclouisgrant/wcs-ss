import { IPerson } from "@/classes/IPerson";
import React, { ChangeEvent, Component } from "react";

type SelectorProps<T extends IPerson> = {
    personDb: Array<T>,
    selectedPerson: T | undefined,
    setSelectedPerson: (person: T | undefined) => void
};

type SelectorState<T extends IPerson> = {
    value: T | undefined;
}

export default class Selector<T extends IPerson> extends Component<SelectorProps<T>, SelectorState<T>> {
    constructor(props: SelectorProps<T>) {
        super(props);
        this.state = { value: this.props.selectedPerson };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e : ChangeEvent<HTMLSelectElement>) {
        var valueIndex = parseInt(e.target.value);

        if (valueIndex == -1) {
            this.setState({value: undefined});
            this.props.setSelectedPerson(undefined);
            return;
        }

        if (valueIndex - 1 > this.props.personDb.length){
            return;
        }

        var newSelectedPerson = this.props.personDb[valueIndex];

        this.setState({value: newSelectedPerson});
        this.props.setSelectedPerson(newSelectedPerson);
    }

    render() {
        let personIndex = 0;

        if (this.state.value != null) {
            personIndex = this.props.personDb.findIndex((person) => person.FullName == this.state.value?.FullName);
        } 
        else {
            personIndex = -1;
        }

        return (
        <select value={personIndex} onChange={this.handleChange}>
            <option key={-1} value={-1}></option>
            {this.props.personDb.map((person, index) => 
            <option key={index} value={index}>{person.FullName}</option>
            )}
        </select>
        )
    }
}