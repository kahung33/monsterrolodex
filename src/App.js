import './App.css';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [searchField, setSearchFeild] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setMonsters(users));
  }, [])

  useEffect(()=>{
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField))
    setFilterMonsters(filteredMonsters);
  },[monsters, searchField])

  const onSearchChange = (event) =>{
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchFeild(searchFieldString);
  }



  return (
     <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder={'search monsters'}/>
        <CardList monsters={filteredMonsters}/>
      </div>
  )
}

// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       monsters: [],
//       searchField:''
//     };
//     console.log('constructor');
//   }

//   componentDidMount(){
//     console.log('componentDidMount');
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(users => this.setState(() => {
//       return {monsters: users}
//     }, 
//     () => {
//       console.log(this.state);
//     }
//     ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(()=>{
//       return { searchField };
//     });
//   };

//   render(){
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField))

//     return (
//       <div className="App">
//       <h1 className='app-title'>Monsters Rolodex</h1>
//       <SearchBox
//         className='monsters-search-box'
//         onChangeHandler={onSearchChange} 
//         placeholder={'search monsters'}/>
//       <CardList monsters={filteredMonsters}/>

//       </div>
//   );
//   }
// }

export default App;
