import useLocalStorage from "./localStorage"
import './styles.css'

export default function LightDarkTheme() {
    
    const [theme, setTheme] = useLocalStorage('theme', 'dark');
    
    
    function handleToggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light')

    }
    console.log(theme)
    return <div className="theme-switch" data-theme={theme}>
        <div className="container">
            <h2>Hello React World</h2>
            <button onClick={handleToggleTheme} >Change Color</button>
        </div>
    </div>
}