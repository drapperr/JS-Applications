function solve(){
    class Post{
        constructor(title,content){
            this.title=title;
            this.content=content;
        }
        toString(){
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post{
        constructor(title,content,likes,dislikes){
            super(title,content);
            this.likes=likes;
            this.dislikes=dislikes;
            this.comments=[];
        }
        addComment(comment){
            this.comments.push(comment);
        }

        toString(){
            let result=[];
            result.push(super.toString()+`\nRating: ${this.likes - this.dislikes}`);
            if (this.comments.length!==0) {
                result.push(`Comments:`)

                this.comments.forEach(comment => {
                    result.push(` * ${comment}`);
                });
            }

            return result.join('\n').trim();
        }
    }

    class BlogPost extends Post{
        constructor(title,content,views){
            super(title,content);
            this.views=views;
        }

        view(){
            this.views++;
            return this;
        }

        toString(){
            return super.toString()+`\nViews: ${this.views}`;   
        }
    } 

    let post = new Post("Post", "Content");

    console.log(post.toString());
    
    // Post: Post
    // Content: Content
    
    let scm = new SocialMediaPost("TestTitle", "TestContent", 25, 30);
    
    scm.addComment("Good post");
    scm.addComment("Very good post");
    scm.addComment("Wow!");
    
    console.log(scm.toString());
    

    return{
        Post,
        SocialMediaPost,
        BlogPost
    }
}

solve()