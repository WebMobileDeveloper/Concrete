import React from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import Accordion from 'react-native-collapsible/Accordion';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ItemBody from "./ItemBody";
import ItemHeader from "./ItemHeader";

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch) => { return {}; }

class RequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
            activeKeys: [],
            items: [],
        };
        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { items } = nextProps;
        if (JSON.stringify(items) !== JSON.stringify(prevState.items)) {
            let activeKeys = [];
            let activeSections = [];
            items.map((item, index) => {
                if (prevState.activeKeys.indexOf(item.key) > -1) {
                    activeKeys.push(item.key);
                    activeSections.push(index);
                }
            })
            return { items, activeKeys, activeSections }
        }
        return null;
    }
    _renderHeader(content, index, isActive, sections) {
        return (<ItemHeader item={content} order_type={this.props.order_type} user_type={this.props.user_type} isActive={isActive} key={item.key}/>);
    }
    _renderContent(content, index, isActive, sections) {
        return (<ItemBody item={content} order_type={this.props.order_type} user_type={this.props.user_type}  isActive={isActive} key={item.key}/>);
    }
    _onChange(indexes) {
        const { items } = this.props;
        let activeKeys = [];
        indexes.map(index => {
            activeKeys.push(items[index].key);
        })
        this.setState({ activeSections: indexes, activeKeys })
    }
    render() {
        return (
            <KeyboardAwareScrollView>
                <Accordion
                    activeSections={this.state.activeSections}
                    sections={this.props.items}
                    renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._onChange}
                />
            </KeyboardAwareScrollView>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
