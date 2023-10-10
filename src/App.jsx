import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export default function App() {
  const [friends, setFriends] = useState([])
  const [picture, setPicture] = useState("")
  const [name, setName] = useState("")

  const getSavedFriends = async () => {
    const response = await axios.get('/api/friends')
    setFriends(response.data)
  }

  useEffect(() => {
    getSavedFriends()
  }, [])
  
  const addFriend = () => {
    const friendsArray = [...friends]
    friendsArray.push({picture: picture, name: name})
    setFriends(friendsArray)
    setPicture("")
    setName("")
  }

  const friendInfo = friends.map((friend) => {
    return (
      <div key={friend.name}>
        <img width="200px" height="200px" src={friend.picture} alt="Random Picture"/>
        <span>{friend.name}</span>
      </div>
    )
  })

  return (
  <div>
    <label for="picture">Picture: </label>
    <input
    type="text"
    id="picture"
    value={picture}
    onChange={(evt) => {
      setPicture(evt.target.value)
    }}/>

    <label for="name">Name: </label>
    <input
    type="text"
    id="name"
    value={name}
    onChange={(evt) => {
      setName(evt.target.value)
    }}/>

    <button type="submit" onClick={addFriend}>Add Friend</button>
    <br></br>
    {friendInfo}
  </div>
  )
}
