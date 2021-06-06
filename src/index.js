const {dotenv} = 'dotenv'
const {cors} = 'cors'
const express = 'express'
const {ApolloServer, ApolloError} = 'apollo-server-express'
const jwt = './utils/jwt';
const {uuid} = './utils/tools'
const {mongodbconfig} = './config/db'
const  bodyParser = "body-parser";

const schemas = './schemas'
const resolvers = './resolvers'

const userModel = './models/userModel';
const postModel = './models/postModel';
const commentModel = './models/commentModel';
const likeModel = './models/likeModel';
const pictureModel = './models/pictureModel'
const followModel = "./models/followModel";

dotenv.config();

const app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === "production"
                ? process.env.DOMAINE_NAME
                : "http://localhost:" + process.env.PORT,
    })
);

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({req}) => {
        if (req) {
            const userInfo = await jwt.checkUser(req)
            return {
                userInfo,
                models: {
                    userModel,
                    postModel,
                    likeModel,
                    pictureModel,
                    commentModel,
                    followModel
                },
                req
            };
        }
    },
    formatError(err) {
        if (process.env.NODE_ENV !== 'test') {
            console.log(uuid() + ": " + err.message)
        }
        return {
            // ErrorEventId: uuid(),
            message: err.message,
        };
    }

});

server.applyMiddleware({app, path: '/graphql'});

mongodbconfig.moogoseConnect()

const appServ = app.listen(process.env.PORT, () => {
        console.log(`🚀 App Launch Server listening on port ${process.env.PORT}`);
});

module.exports = {
    appServ,
    server
};