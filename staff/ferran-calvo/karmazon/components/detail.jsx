function Detail({ vehicle: { id, name, year, price, image, color, maker, collection, 
    description, url, heart }, style: { name: styleName, image: styleImage, url: styleUrl }, onFavClick, goBack }){ 
        debugger
 
    return <li>
        <h3>{name} ({year})</h3>
        {heart ? <HeartRed id={id} onClick={onFavClick}/> : <Heart id={id} onClick={onFavClick}/>}
        <img src={image} />
        <span>{price} €</span>
        <p>{color}</p>
        <p>{maker}</p>
        <p>{collection}</p>
        <p>
            <a href={styleUrl}>{styleName}</a>
            <img src={styleImage} />
        </p>
        <p>{description}</p>
        <a href={url}>{url}</a>
        <a href="" onClick={event => {
            event.preventDefault()
            goBack()
        }} >Go Back</a>
    </li>
}