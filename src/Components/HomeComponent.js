import React from "react";
import BodyComponent from './BodyComponent'

export default class HomeComponent extends React.Component {

    render() {
        const header = {
            flex: 10,
            backgroundColor: 'rgb(50, 50, 100)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 40,
            paddingTop: 50,
            paddingBottom: 50,
        }

        const headerText = {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
            padding: 10,
        }
        return (
            <div>
                <div style={header}>
                    <h1 style={headerText} > EBook to DocBook </h1>
                </div>
                <BodyComponent />
            </div>
            );
    }
}
