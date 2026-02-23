use serde::Serialize;

#[derive(Serialize)]
pub struct Node {
    id: String,
    r#type: String,
    status: String,
    children: Vec<Node>,
}

#[tauri::command]
pub async fn get_execution_tree() -> Result<Node, String> {
    // Return dummy tree for visual demonstration
    Ok(Node {
        id: "root".to_string(),
        r#type: "agent".to_string(),
        status: "success".to_string(),
        children: vec![
            Node {
                id: "child-1".to_string(),
                r#type: "tool".to_string(),
                status: "success".to_string(),
                children: vec![],
            },
            Node {
                id: "child-2".to_string(),
                r#type: "agent".to_string(),
                status: "running".to_string(),
                children: vec![],
            }
        ]
    })
}
