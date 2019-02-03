import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }
    componentDidMount() {
        fetch('https://admin.insights.ubuntu.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=True')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            })
    }

    render() {
        let {isLoaded, items} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="App">
                    <div className="col-12">
                        {items.map(item => (
                    <div className="p-card--highlighted">
                        <p className="category" key={item.category}>{item._embedded['wp:term'][0][0].name}</p>
                        <span key={item.name}>{item._links.name}</span>
                        <img src={item._embedded['wp:featuredmedia'][0].link} alt="img"/>
                    <h3 className="p-card__title" key={item.title}>
                        <a href={item.link}>
                            {item.title.rendered}
                        </a>
                    </h3>
                        <p className="p-card__content" key={item.date}>By
                            <a href={item._embedded.author[0].link}> {item._embedded.author[0].name} </a>
                           on {new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(item.date))} </p>
                        <p key={item.type}> {item.type}</p>
                    </div>
                        ))}
                    </div>
                </div>
            );
        }
  }
}

export default App;
