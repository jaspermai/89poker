interface TitleProps {
    className?: string;
}

export function Title({className = ''}: TitleProps) {
    return(
        <h1 className={`text-6xl text-white flex items-center justify-center mt-12 ${className}`}>89 POKER NIGHT</h1>
    )
}