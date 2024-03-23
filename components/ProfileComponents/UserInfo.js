const UserInfo = (props)=>{
  
  return(
    <View style={styles.infoHolder}>
    <View style={styles.buttonHolder}>
      <Text style={styles.text}>{LogInUser.payload.address}</Text>
      <Button title="Change" style={styles.button} onPress/>
    </View>
    <View style={styles.buttonHolder}>
      <Text style={styles.text}>{LogInUser.payload.email}</Text>
      <Button title="Change" style={styles.button}/>
    </View>
    <View style={styles.buttonHolder}>
      <Text style={styles.text}>{LogInUser.payload.phoneNumber}</Text>
      <Button title="Change" style={styles.button}/>
    </View>
    </View>
  )
}


export default UserInfo