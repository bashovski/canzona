import React, {Component} from 'react';
import UserSettingsCategories from "../../components/UserSettingsCategories";
import './styles.scss';

export default class UserSettings extends Component {

    render() {
        return(
            <div className="cna-user_settings">
                <div className="cna-user_settings-container">
                    <div className="cna-user_settings-menu">
                        <div className="cna-user_settings-menu-heading">
                            <span>
                                Settings
                            </span>
                            <div className="cna-row_break"/>
                        </div>
                        <UserSettingsCategories/>
                    </div>
                    <div className="cna-user_settings-items">
                        test
                    </div>
                </div>
            </div>
        );
    }
}
