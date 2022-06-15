
// const User = mongoose.model<UserType>('User', UserSchema);

export class UserDao {
  static async getUser(username: string): Promise<User> {
    return await User.findOne({username}).exec();
  }

  static async addUser(username: string, spotifyRefreshToken: string): Promise<User> {
    return await User.updateOne({username}, {username, spotifyRefreshToken}, {upsert: true});
  }

  static deleteUser(username: string): Promise<any> {
    return User.deleteOne({username}).exec();
  }
}
