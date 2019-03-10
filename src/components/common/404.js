import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Layout } from '../routes/LoansListPage'

function NotFoundPage() {
  return (
    <Layout>
      <Card>
        <CardContent>
          <Typography variant="h3" component="h1">
            404: Page Not Found{' '}
            <span role="img" aria-label="thinking">
              🤔
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default NotFoundPage
