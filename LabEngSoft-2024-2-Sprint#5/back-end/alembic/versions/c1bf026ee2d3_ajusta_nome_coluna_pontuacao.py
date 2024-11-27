"""ajusta nome coluna pontuacao

Revision ID: c1bf026ee2d3
Revises: 5814bfb3fa96
Create Date: 2024-11-12 21:32:32.064948

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c1bf026ee2d3'
down_revision: Union[str, None] = '5814bfb3fa96'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('usuario', 'pontucao', new_column_name='pontuacao')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('usuario', 'pontuacao', new_column_name='pontucao')
    # ### end Alembic commands ###