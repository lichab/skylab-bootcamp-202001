function Item (item: {id, name, image,isFav}, onItemClick, onFavClick) {
    return <li className ="item results__item">
        <h3 className="item__title" onClick ={()=> onItemClick (id)}>{name}</h3>
            {image && <img scr={image}/>}
            {!image && <img scr="https://vignette.wikia.nocookie.net/rickandmorty/images/9/98/S2e3_mount_morty_and_summer.png/revision/latest?cb=20160923231412"/>}
        <div className="item__desc" onClick={()=>onFavClick(id)}>
            {isFav && <i className="item__heart fas fa-heart"></i>}
            {!isFav && <i className="item__heart far fa-heart"></i>}
        </div>
    </li>
}