import './App.css';
import Dropable from './components/Dropable';

export const items = [
    {
        id: 1,
        name: 'mot',
    },
    {
        id: 2,
        name: 'hai',
    },
    {
        id: 3,
        name: 'ba',
    },
    {
        id: 4,
        name: 'bon',
    },
    {
        id: 5,
        name: 'nam',
    }
];

function App() {
    return (
        <div className="App">
            <Dropable>
                {
                    items.map(item => <div
                            key={`${item.id}-${item.name}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                marginBottom: '5px',
                                borderRadius: '10px',
                                backgroundColor: ['red', 'green', 'blue', 'pink'][Math.floor(Math.random(0, 4) * 4)],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {item.name}
                        </div>)
                }
            </Dropable>
        </div>
    );
}

export default App;
