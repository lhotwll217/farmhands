import { useState } from "react";
import { Button, Grid, GridColumn, Header, TabPane } from "semantic-ui-react";
import { format } from "date-fns";

export default function AboutTab({ profile }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          <Button
            onClick={() => setEditMode(!editMode)}
            floated='right'
            basic
            content={editMode ? "Cancel" : "Edit"}
          />
        </GridColumn>
        <GridColumn width={16}>
          {editMode ? (
            <p> Profile Form</p>
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  {" "}
                  Member since: {format(profile.createdAt, "dd MMM yyy")}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
