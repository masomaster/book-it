import './Footer.css';

export default function Footer() {
    return (
        <>
            <footer>
                <hr/>
                <div className="footer-text">
                    <span className="book-it small">BookIt!</span><span>Helping people finish books since... well... yesterday.</span><span><a href="https://github.com/masomaster/book-it"><img className="gibhub-img" src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/github/github-original.svg" alt="Github" target="_blank"/></a></span>
                </div>
            </footer>
        </>
    )
}