import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    title: '',
    description: '',
    category: '',
    color: '#fab71f',
    cards: [],
    check: false
  }

  onChange = (event) => {
    const value = event.target.name;

    this.setState({
      [value]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (typeof(this.state.edit) == 'number') {
      const { cards } = this.state;

      cards[this.state.edit] = {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        color: this.state.color
      }

      this.setState({
        cards,
        edit: undefined,
        title: '',
        description: '',
        category: '',
        color: '#fab71f',
      });
    }

    else {
      let card = {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        color: this.state.color
      }

      this.setState({
        title: '',
        description: '',
        category: '',
        color: '#fab71f',
        cards: [
          ...this.state.cards,
          card
        ]
      });
    }
  }

  handleDelete = (note) => {
    this.setState({
      cards: this.state.cards.filter((el) => el !== note)
    })
  }

  handleEdit = (note, index) => {
    this.setState({
      title: note.title,
      description: note.description,
      category: note.category,
      color: note.color,
      edit: index
    })
  }

  handleCheck = (index) => {
    const { cards } = this.state;
    const note = this.state.cards[index]

    cards[index] = {
      ...note,
      check: !note.check
    }

    this.setState({
      cards,
    });
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              required
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              required
            />
          </label>
          <label>
            Categoria
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.onChange}
              required
            />
          </label>
          <label>
            Color
            <input
              type="color"
              name="color"
              value={this.state.color}
              onChange={this.onChange}
              required
            />
          </label>
          <button>Submit</button>
        </form>
        <ul>
          {this.state.cards.map((item, index) => {
            return (
              <li
                style={{ backgroundColor: item.color}}
                key={index}
              >
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>{item.category}</p>
                <p>{item.color}</p>
                <div>
                  {!item.check && (
                    <button onClick={() => this.handleEdit(item, index)}>
                      edit
                    </button>
                  )}
                  {!item.check && (
                    <button onClick={() => this.handleDelete(item)}>
                      delete
                    </button>
                  )}
                  <button onClick={() => this.handleCheck(index)}>
                    {item.check ? "concluído" : "a fazer"}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    )
  }
}

export default App;