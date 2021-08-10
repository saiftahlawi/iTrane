import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons'
import { CreditCardInput } from "react-native-input-credit-card";

export default class Payment extends React.Component {
    constructor() {
        super()
        this.state = {
            paymentMethod: null,
            iscard: false,
            error: null,
            noCards: 1,
            isValidCard: false,
            card: <CreditCardInput requiresName onChange={form => this.isValidCard(form)} />
        }
    }

    handleCashMethod = e => {
        this.setState({
            iscard: !this.state.iscard
        })
    }

    handleCash = e => {
        if (this.state.paymentMethod === null) {
            this.setState({
                paymentMethod: e
            })
        } else {
            this.setState({
                paymentMethod: null
            })
        }
    }

    handleVisa = async e => {
        await this.setState({
            paymentMethod: e,
            noCards: this.state.noCards.push(1)
        })
        alert(this.state.noCards)
    }

    isValidCard = obj => {
        this.setState({
            isValidCard: obj.valid,
        })
        console.log(obj.valid)
    }

    handleRemove = e => {
        this.setState({
            noCards: 0
        })
    }

    render() {
        return (
            <View style={Styles.component}>
                <View style={Styles.header}>
                   
                    <View style={Styles.headerTextContainer}>
                        <Text style={Styles.h1}>Payment</Text>
                    </View>
                </View>

                <View style={Styles.body}>
                    <View style={Styles.elementsContainer}>

                        <View style={Styles.methodsWrapper} >
                            {this.state.noCards > 0? false:this.state.iscard ?false:<TouchableOpacity onPress={e =>{ this.handleCash('cash') }} style={{ ...Styles.methodsContainer, backgroundColor: this.state.paymentMethod === 'cash' ? '#f5f5f5' : '#fff' }}><AntDesign style={Styles.icon} name='cash' />
                                <Text style={Styles.label}>Cash</Text></TouchableOpacity>} 
                            {this.state.noCards > 0 ? false : <TouchableOpacity onPress={this.handleCashMethod} style={Styles.methodsContainer}>
                                {this.state.iscard ? <Text style={{ color: '#4286fa', fontSize: 18 }}>Cancel</Text> : <Text style={{ color: '#4286fa', fontSize: 18 }}>Add payment method</Text>}
                            </TouchableOpacity>}

                            <View>
                                {this.state.noCards > 0 ? <View><CreditCardInput  inputContainerStyle={{ display: 'none' }} labelStyle={{ display: 'none' }} inputStyle={{ display: 'none' }} requiresName name = 'aaa' />

                                    <View>
                                        <TouchableOpacity onPress={e => this.handleRemove()}>
                                            <Text>Remove Card</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View> : false}
                            </View>

                            <View style={Styles.cardContainer}>
                                {this.state.iscard ? <View>{this.state.card}<View style={Styles.btnContainer}>
                                    <TouchableOpacity
                                        disabled={this.state.isValidCard ? false : true}
                                        style={{ ...Styles.btn, opacity: this.state.isValidCard ? 1 : 0.3 }}
                                        onPress={e => { this.handleVisa('card') }}
                                        underlayColor='#fff'><Text style={Styles.submitText}>save</Text></TouchableOpacity>
                                </View></View> : null}

                            </View>

                        </View>
                        <View>
                        </View>
                    </View>
                </View>
                <View>
                </View>
                <View>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    component: {
        height: '100%',
        width: '100%',
    },
    header: {
        height:85,
        width: '100%',
        backgroundColor: '#FFD428',
        paddingTop: 10,
        paddingRight: '5%',
        paddingLeft: '5%'
    },
   
    headerTextContainer: {
        marginTop: 2,
        width: '90%',
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 26
    },
    formContainer: {
        justifyContent: 'center',
    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",

    },
    inputOuterContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        width: '70%',
        height: 48,
        marginTop: 40,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold',
    },
    nextText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    error: {
        color: '#eb0a02',
        marginTop: 3.5,
        fontSize: 10,
    },
    body: {
        height: '100%',
        width: '100%'
    },
    elementsContainer: {
        height: '100%',
    },
    methodsWrapper: {
        height: '100%',
        marginTop: '3%',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    methodsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '8%',
    },
    icon: {
        fontSize: 45,
        color: '#85bb65',
    },
    label: {
        fontSize: 20,
        marginLeft: 12,
    },
    cardContainer: {
        width: '100%',
        height: '100%',
        alignContent: 'center'
    },
    btnContainer: {
        width: '100%',
        height: 48,
        marginTop: '50%',
        justifyContent: 'center',
    },
    btn: {
        textAlign: 'center',
        width: '35%',
        height: 48,
        backgroundColor: '#242A37',
        right: 10,
        position: 'absolute',
        justifyContent: 'center',

    },
    disabledBtn: {
        opacity: 0.5
    },
    submitText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    }
});