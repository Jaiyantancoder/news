import React from 'react';
import { Grid,Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './newsStyles.js';
import Data from './temp_data.json';

function NewsCard() {

const classes = useStyles();   
const article = Data[0]
console.log(article) 
    return (
        <Card className={classes.card}>
        <CardActionArea href={article.url} target="_blank">
          <CardMedia className={classes.media} image={article.urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={article.title} />
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{(new Date(article.publishedAt)).toDateString()}</Typography>
            <Typography variant="body2" color="textSecondary" component="h2">{article.source.name}</Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{article.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{article.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" href={article.url} target="_blank">Learn More</Button>
          <Typography variant="h5" color="textSecondary" component="h2">{1}</Typography>
        </CardActions>
      </Card>
     
    )
}

export default NewsCard
