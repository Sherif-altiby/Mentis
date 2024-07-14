import './MainHeader.scss';

const MainHeader = ({title}: {title: string}) => {
  return (
    <div className="main-header" >
          <h1> {title} </h1>
    </div>
  )
}

export default MainHeader