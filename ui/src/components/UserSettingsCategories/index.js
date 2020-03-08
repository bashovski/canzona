import React, {Component} from 'react';
import './styles.scss';
import categories from "../../services/Settings/categories";

export default class UserSettingsCategories extends Component {

    renderCategories() {
        let jsx = [];
        for(let i = 0; i < categories.length; i++) {
            jsx.push(
                <div key={`user-settings-category-${i}`}
                    className="cna-user_settings-category">

                    <img src={require(`../../assets/icons/setting-${categories[i].icon}.svg`)}
                         alt={categories[i].name}
                    />
                    <span>{categories[i].name}</span>
                </div>
            );
        }
        return jsx;
    }

    render() {
        return(
            <div className="cna-user_settings-categories">
                {this.renderCategories()}
            </div>
        )
    }
}
