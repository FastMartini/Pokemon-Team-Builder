import './Pokelab.css';

function Pokelab() {
    return(
        <div className='lab-container'>
            <div className='header'>
                <h1>Martini's Pokelab</h1>
            </div>

        <p className='description'>
            Welcome to the Pokelab! 
            Choose from a variety of Paldea's pokemon 
            to create a team with.
        </p>

        <button className='forge-btn'>Forge your team</button>
        </div>
    );
}

export default Pokelab;