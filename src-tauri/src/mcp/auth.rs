use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
    pub scope: String,
}

pub struct OAuth2Validator {
    decoding_key: DecodingKey,
    validation: Validation,
}

impl OAuth2Validator {
    pub fn new(secret: &[u8]) -> Self {
        let mut validation = Validation::new(Algorithm::HS256);
        validation.validate_exp = true;
        validation.required_spec_claims = vec!["exp".to_string()];
        Self {
            decoding_key: DecodingKey::from_secret(secret),
            validation,
        }
    }

    pub fn validate_token(&self, token: &str) -> Result<Claims, String> {
        decode::<Claims>(token, &self.decoding_key, &self.validation)
            .map(|data| data.claims)
            .map_err(|e| e.to_string())
    }
}
